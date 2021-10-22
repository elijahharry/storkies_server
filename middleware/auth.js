import jwt from "express-jwt";
import jwks from "jwks-rsa";

var authorizeAccessToken = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://storkies.us.auth0.com/.well-known/jwks.json",
  }),
  audience: "https://storkserver.xyz",
  issuer: "https://storkies.us.auth0.com/",
  algorithms: ["RS256"],
});

export default authorizeAccessToken;
