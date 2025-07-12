const clientId = 'a004db0e2eff43329be0a9f676ac1ff7';
const redirectUri = "https://kennedysovine.github.io/Jammming/";
let accessToken;
let expiresIn;

export const setAccessToken = (token) => {
    accessToken = token;
}

export const getAccessToken = () => {
    if (accessToken) {
        return accessToken;
    }
}

export const searchFor = async (searchTerm) => {
    const token = await SpotifyAPI.getAccessToken();
    if (!token) return [];
    const url = 'https://api.spotify.com/v1/search?type=track';
    const endPoint = `${url}&q=${encodeURIComponent(searchTerm)}`;
    const response = await fetch(endPoint, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    const jsonResponse = await response.json();
    if (!jsonResponse.tracks || !jsonResponse.tracks.items) return [];
    return jsonResponse.tracks.items.map(track => ({
        id: track.id,
        name: track.name,
        artists: track.artists || [],
        album: track.album ? track.album.name : '',
        uri: track.uri
    }));
}

export const SpotifyAPI = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    // Check for access token in URL
    const hash = window.location.hash;
    const tokenMatch = hash.match(/access_token=([^&]*)/);
    const expiresMatch = hash.match(/expires_in=([^&]*)/);

    if (tokenMatch && expiresMatch) {
      accessToken = tokenMatch[1];
      expiresIn = Number(expiresMatch[1]);

      // Clear the token after it expires
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      // Remove token from URL
      window.history.pushState('Access Token', null, '/');

      return accessToken;
    } else {
      // Redirect to Spotify authorization
      const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${encodeURIComponent(redirectUri)}`;
      window.location = authUrl;
    }
  },

  async savePlaylist(name, trackUris) {
    if (!name || !trackUris.length) return;
    const accessToken = this.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' };

    // 1. Get current user's ID
    const userResponse = await fetch('https://api.spotify.com/v1/me', { headers });
    const userData = await userResponse.json();
    const userId = userData.id;

    // 2. Create a new playlist
    const createResponse = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ name })
    });
    const playlistData = await createResponse.json();
    const playlistId = playlistData.id;

    // 3. Add tracks to the new playlist
    await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ uris: trackUris })
    });
  }
};