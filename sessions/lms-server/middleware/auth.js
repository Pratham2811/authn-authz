export const authenticate = (req, res, next) => {
  const sessionId  = req.cookies?.sessionId;
  if (!sessionId) {
    const sessionId = crypto.randomUUID();
    return res.cookie({ "sessionId": sessionId });
    next();

  } else {
    req.sessionId = sessionId;
    next();
  }
};
