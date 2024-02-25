import jwt from 'jsonwebtoken';

  interface DecodedTokenPayload {
    exp: number;
    // Add other claims if necessary
  }
  
  interface DecodedToken {
    payload: DecodedTokenPayload;
    // Add other properties from the header if necessary
  }

  export const checkTokenExpiration = (token: string | null): boolean => {
    try {
  
      if (!token) {
        // Token is not available
        return true;
      }
  
      const decodedToken: DecodedToken = jwt.decode(token, { complete: true }) as DecodedToken;
      // console.log(decodedToken)
  
      if (!decodedToken || !decodedToken.payload.exp) {
        // Token is invalid, malformed, or does not have an expiration claim
        return true;
      }
  
      // Check if the token has expired
      const currentTimestamp: number = Math.floor(Date.now() / 1000);
      if (decodedToken.payload.exp < currentTimestamp) {
        // Token has expired
        return true;
      }
  
      // Token is valid and has not expired
      return false;
    } catch (error) {
      // An error occurred while decoding the token
      console.error('Error decoding JWT token:', error);
      return true;
    }
  };







 