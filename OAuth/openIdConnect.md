https://frontegg.com/guides/oidc-authentication#RBAC

What Is OpenID Connect (OIDC)?
The OpenID Connect (OIDC) authentication protocol lets you verify the identity of users attempting to gain access to endpoints protected by HTTPS. The OpenID Foundation (comprising companies such as Google and Microsoft) developed OIDC on the basis of the Open Authorization (OAuth) protocol. While OAuth provides only authorization, OIDC delivers an added layer of security through authentication.

This combination of authentication and authorization means you can use OIDC for single sign-on (SSO), which allows users to retain a single login across multiple websites or applications. SSO is very convenient for users, because it doesn’t force them to memorize and re-enter credentials to access different sites. OIDC is basically a next-gen user management technology, as it helps manage identities.

This is a part of an extensive series of guides about Access Management.

In this article:

What Is OpenID Connect (OIDC)?
How Does OpenID Connect Work?
OpenID Connect Flows
What Is an OpenID Connect Provider?
Benefits of Using OpenID Connect
Open ID Connect vs. Other Protocols
11 OIDC Best Practices for Relying Parties
OIDC with Frontegg
See Additional Guides on Key Access Management Topics
RBAC
How Does OpenID Connect Work?
ID Tokens
In a traditional OAuth flow, the end-user provides their credentials to the identity provider. The user receives an authorization prompt, in which they allow the delegated app to reuse their login to the identity provider. OAuth then provides the application an Access Token, which authorizes the user to access the app, but does not contain any information about the user. 

OIDC uses the same authorization prompt to authenticate the user and provide an ID Token. The ID Token is technically a JSON Web Token (JWT), and includes identifiable information about the user, such as their name and email address. The application can use this ID Token to prove users are authenticated.

Standardized Scopes
OAuth uses the concept of tokens and scopes:

A token grants the user permission to do something. For example, a bus ticket is a token, because it allows someone to board a bus.
A scope defines what the user can do. With bus tickets, their details specify which bus can be boarded and define the length of the commute.
In the original OAuth standard, applications had to define scopes themselves, and there was no agreed standard for scopes. Because scopes could be different for each provider, it was difficult to integrate with multiple identity providers. 

OIDC takes this one step further by providing the UserInfo Endpoint, which delivers information about the user, leveraging a set of standard scopes, while allowing customization. An OIDC ID Token includes the following basic claims: 

ID Token Claim	Meaning
sub	Asserts the user’s identity (subject)
iss	Says which authority issued the token (issuer)
aud	Specifies for which client the token was generated (audience)
iat	Specifies when the token was generated (issue time)
exp	Specifies when the token is set to expire (expiration time)
auth_time	Specifies when the user was authenticated (authentication time)
acr	Specifies the encryption strength used to authenticate the user (authentication encryption) 
Also, the ID Token provides apps with additional user data, which isn’t a part of the authentication process and is used for functional purposes. The ID Token can include names, emails, and more (see the full list of OIDC standard user claims). You can use standard OIDC scopes alongside regular OAuth scopes, so OIDC supports previous scopes developed by identity providers.

OpenID Connect Flows
OIDC has discontinued the use of grants, and the OAuth Implicit Flow is deprecated as it’s insecure. OIDC uses the Proof Key for Code Exchange (PKCE) OAuth extension to prevent CSRF and authorization code injection attacks. 

Here are some of the main OIDC flows.

OIDC Implicit Flow
You can use this flow for non-sensitive data and browser-based applications. It works by allowing authorization endpoints to request identity tokens directly (if necessary, they can also request OAuth access tokens). 

Implicit flow is seen as a less secure option because the tokens are visible to the browser (as well as the code running in the browser). This significantly expands the attack surface. For this reason, you should only use implicit flow for tokens that do not contain any sensitive data or personally identifiable information (PII), or for number-only-used-once (nonce) validation.

OIDC Authentication Flow
This flow is useful for web-based apps that require backend communication with identity providers. It is a three-legged flow, which works by returning OAuth access tokens to the web app through backend calls. Instead of directly transmitting a user’s details, the provider sends one-time codes, which can be exchanged for OAuth access tokens, providing the app with the client ID and secret. 

This is a secure flow because the browser cannot see the tokens, and the identity provider can authenticate the application.

OIDC Authorization Code Flow
This flow is mostly used for server-side apps. It works by allowing apps to request authorization codes from an authorization endpoint. These codes can be exchanged for identity tokens or OAuth access tokens as needed. 

While the identity and access tokens are not exposed to the browser, refresh tokens can be used to enable actions on the behalf of a user (when the user is no longer present or is no longer active). For this reason, the authorization code flow should be strictly reserved for confidential clients, who can be relied upon to store the secrets safely. This flow needs to be planned carefully and monitored constantly.

OIDC Hybrid Flow
You can use this flow for clients that must process authorization code before exchanging it for tokens or non-sensitive information. It works by letting authorization endpoints return authorization codes and tokens. Endpoints can perform code hash checks and nonce validation in advance, and client apps can use PKCE to prevent malicious injections of authorization code. 

This option is not suitable for sensitive data because it exposes tokens to the browser. Like the authorization code flow, this flow enables actions to be performed on behalf of a user when offline. Limit it to confidential clients.

What Is an OpenID Connect Provider?
An OIDC Provider is a certified OpenID Provider library offering a secure authentication mechanism for Node.js apps and API security. It provides an authentication framework, rather than allowing you to mount and modify specific elements. However, it may not suit cases that require custom logic or grant types. The library is certified for all five OpenID conformance profiles.

Top public OpenID Connect providers today include Google, Microsoft, Amazon, PayPal, Yahoo, and Okta. Most of these options provide discovery metadata in JSON (with the exception of Amazon and Okta).

Benefits of Using OpenID Connect
Now that we have covered how OpenID Connect works, lets learn about the main benefits of embracing this authentication and authorization methodology. 

Standardization – OIDC is a standard protocol that can work with any application. With OpenID Connect, you can define how to implement authentication and display authentication results to the client.
Readable JSON Format – Makes data interchange simple and transparent. 
API-Ready – Built on OAuth, which provides robust API access. OIDC provides additional data to enable the client to see who has logged in and with what level of access, something that makes user management easier.
Web and Mobile Support – SSO for cross-platform apps.
Open ID Connect vs. Other Protocols
OIDC vs. OAuth2
OAuth2 is primarily an authorization framework, which allows applications to obtain limited access to user accounts on an HTTP service. OAuth2 provides access tokens that can be used to access resources on behalf of a user. It does not, however, provide information about the user itself.

OIDC, built on top of OAuth2, adds an authentication layer, enabling the client to verify the identity of the end-user based on the authentication performed by an Authorization Server. OIDC provides ID Tokens, which contain user information and are used to prove that the user has been authenticated. This addition makes OIDC more suitable for SSO scenarios compared to OAuth2 alone.

OIDC vs. SAML
Security Assertion Markup Language (SAML) is an older protocol compared to OIDC, used primarily for SSO in enterprise environments. SAML uses XML for message formatting and relies on browser redirects to transfer authentication information between the identity provider and the service provider.

OIDC, in contrast, uses JSON and a RESTful interface, making it more suitable for modern web applications and APIs. OIDC is simpler to implement than SAML and is designed to work seamlessly with both web and mobile applications. While SAML is robust and widely adopted in corporate environments, OIDC offers a more developer-friendly and flexible approach to authentication, especially for new applications.

Read more about OIDC vs SAML.

OIDC vs. LDAP
Lightweight Directory Access Protocol (LDAP) is a protocol used to access and manage directory information services over a network. LDAP is primarily used for authentication and as a directory service in enterprise environments. It allows applications to interact with a centralized directory to retrieve user details and perform authentication.

OIDC is a web-based protocol that uses OAuth2 for authorization and adds an authentication layer. OIDC does not replace LDAP but can complement it. For example, an organization might use LDAP for internal authentication and OIDC for external applications and SSO. OIDC is more suitable for web and mobile applications that require a modern, standardized approach to authentication and authorization.

OIDC vs. Kerberos
Kerberos is a network authentication protocol designed to provide strong authentication for client-server applications. It uses secret-key cryptography and requires a trusted third party, known as the Key Distribution Center (KDC), to authenticate users and services.

OIDC is more suited for web and mobile applications, offering a simpler implementation through its use of OAuth2 and JSON Web Tokens (JWT). Unlike Kerberos, which is typically used within a controlled enterprise network, OIDC is designed for use across the internet and supports a wide range of devices and platforms.

Kerberos provides a high level of security and is suitable for environments where internal security is critical. In contrast, OIDC offers greater flexibility and ease of integration for modern applications that require secure authentication across various platforms and devices.

Read More: OIDC vs OAuth2

11 OIDC Best Practices for Relying Parties
A Relying Party (RP) is an organization that uses OpenID Connect to enable users to authenticate through other identity providers. Here are some of the best practices recommended for RPs:

Ensure protection against Cross-Site Scripting (XSS) and Cross-Site Request Forgery (XSRF) attacks at all times. Apply XSRF protection to all URLs that can update or modify a user’s account state. 
Use an existing OIDC library. Don’t try to implement the OpenID Protocol from scratch. You can use certified open-source libraries such as OpenID.net.
Ensure that any authentication session you create doesn’t last longer than the original authentication session of your users’ OpenID provider. Regularly verify that users remain signed in to their provider, by calling the checkid_immediate() interface of the provider. 
Implement Relying Party Discovery by publishing a discovery document listing your OpenID endpoints and ensuring it is discoverable. A discovery doc helps the OpenID provider check the legitimacy of authentication requests.
Communicate with the OpenID provider via the PAPE extension to provide the security policies for user authentication. As an RP, you trust the user’s OpenID provider to authenticate users according to your security policies. 
Avoid using OpenID assertions to authorize monetary transactions when users have authenticated with a NIST assurance level of 0. You can see the assurance level in the PAPE messages contained within assertions. 
Always authenticate the user when connecting an existing OpenID-enabled account. You do this by verifying a user’s password. If you are combining multiple OpenIDs in a single account, you must ensure that the user controls the identifier for each OpenID. 
If you choose to implement the OpenID protocol yourself (instead of an established library), you’ll need to take extra precautions. Be aware of additional risks involved. For example, attackers can use XSRF to quietly sign a user into your  website. This works by forcing checkid_immediate() requests to the OpenID provider through the relying party’s login page. 

While the first seven best practices were general recommendations, you you implement the following while implementing your own OpenID library:

To avoid association poisoning, ensure that all RP associations are keyed with OpenID Provider endpoints.
Ensure you use signatures and that openid.sig values are always verified for each OpenID response. Nonce verification helps against replay attacks.
Make sure you use any optional OpenID URL fragments to identify the user. This is important because while some OpenID providers can recycle user identifiers, the identifier fragments cannot be recycled.
When you compare Claimed Identifiers use case-sensitive checks for the whole path, queries, and fragments (the host element doesn’t have to be case-sensitive). Case-sensitive checks may be useful when looking up an account for a user who has recently logged in with OpenID.
OIDC with Frontegg
With Frontegg, you can utilize OpenID Connect in 2 ways. Firstly, OIDC can be used as a Service Provider, allowing end customers to federate identity to their IDPs using Open-ID connect protocol. Secondly, the Frontegg solution can act (via a hosted login) as an Identity Provider (IDP) by providing OIDC compliant authentication for customers to redirect their users to the hosted login.

OIDC is the new way of making multiple applications work in tandem with zero hiccups or technical issues. Want to add OIDC to your application? You can get started now with Frontegg, an end-to-end user management platform.

Start For Free

See Additional Guides on Key Access Management Topics
Together with our content partners, we have authored in-depth guides on several other topics that can also be useful as you explore the world of access management.

RBAC
Authored by Frontegg

What Is Role-Based Access Control (RBAC)? A Complete Guide  
Role Based Access Control Best Practices You Must Know 
RBAC in Azure: A Practical Guide 
SSO
Authored by Frontegg

Google SSO: How It Works and 4 Tips for Success
Okta SSO: Features, Pricing, and Integrations
Implementing Single Sign-on – Full Guide 
Network Topology Mapping
Authored by Faddom

Network Topology Mapping 101: The Categories, Types, and Techniques
A Beginners Guide to Understanding Microsegmentation
The basics of networking on VMware
🤖 Explore this content with AI: