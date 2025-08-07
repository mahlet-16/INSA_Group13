## **What is HTTP?**

**HTTP** stands for HyperText Transfer Protocol It is request-response protocol. It allows web browsers (clients) to communicate with web servers to request and exchange resources like HTML pages, images, videos, and APIs. Simply HTTP is the language web browser and web server speaks. it is used to load pages on the Internet using hyperlinks.

**HTTP Request**: the way Internet communications platforms such as web browsers ask for the information they need to load a website.<br>**HTTP Response**: what web clients (often browsers) receive from an Internet server in answer to an HTTP request. These responses communicate valuable information based on what was asked for in the HTTP request.

#### **HTTP workflow**

User clicks a link -> browser sends an HTTP request -> Server process and return HTTP response -> browser renders the resource.

#### **HTTP Methods**

**GET**: is used to retrieve information from the given server using a given URI.<br>**HEAD**: the same as GET, but transfers the status line and header section only.<br>**POST**: is used to send data to a server using HTML forms.<br>**PUT**: the same as POST, but replaces all current representations of the target resource with the uploaded content.<br>**DELETE**: removes all current representations of the target resource given by a URI.<br>**CONNECT**: establishes a tunnel to the server identified by a given URI.<br>**OPTIONS**: describes the communication options for the target resource.

| Version             | Features                                                                                                                                                                                                                                                                                                                    |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **HTTP/0.9 (1991)** | - Only supported `GET` requests.<br>- No headers, status codes, or error handling.<br>- Plain text responses (HTML only).<br>- Connection closed after response.                                                                                                                                                            |
| **HTTP/1.0 (1996)** | - Introduced HTTP headers.<br>- Multiple HTTP methods (`GET`, `POST`, `HEAD`).<br>- Introduced status codes (e.g., `200 OK`, `404 Not Found`).<br>- Support for different content types (HTML, images, etc.).                                                                                                               |
| **HTTP/1.1 (1997)** | - Persistent connections (keep-alive by default).<br>- Pipelining was added (send multiple requests without waiting).<br>- Host header (enabling virtual hosting).<br>- Chunked transfer encoding (streaming data).<br>- Cache control mechanisms were introduced.<br>- More methods (`PUT`, `DELETE`, `OPTIONS`, `TRACE`). |
| **HTTP/2 (2015)**   | - Binary protocol (instead of text).<br>- Multiplexing (multiple requests over one connection).<br>- Header compression (HPACK).<br>- Server push (send resources before request).<br>- Improved speed and efficiency.                                                                                                      |
| **HTTP/3 (2022)**   | - Runs over QUIC (UDP-based transport).<br>- Faster connection establishment (0-RTT handshake).<br>- Improved congestion control.<br>- No head-of-line blocking.<br>- Built-in encryption (mandatory TLS).                                                                                                                  |
