export default interface ResponseError extends Error {
  statusCode?: number;
}
