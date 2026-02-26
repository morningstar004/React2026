Auth service
The Auth Service is the user authentication and authorisation service for managing Corda nodes and networks (CENM). It stores and controls secure user-access to network services, such as:

Nodes.
Identity Manager
Zone Service
Signing Service
Network Map (and associated network configurations and node info)
Whenever you use the User Administration Tool to create new users, groups or roles, the Auth Service is updated to authenticate those users and their permissions. When using the remote management tools such as the CENM Command Line Interface or the web GUIs hosted on the Gateway Service, the Auth Service verifies your identity and security clearance as needed.

You do not need to interact directly with the Auth Service once it has been installed and configured. To protect the integrity of this secure service, there is no direct API contact with the Auth Service: all front-end communications go via the Gateway Service.

Auth Service can also be configured to use Azure AD SSO.

Install the Auth service
You can install the Auth service by either:

Installing the accounts-application.jar.
Installing the Docker image.
Install using the docker image
The docker image contains the application jar itself setup to run with the Initial user commands.

To install from the docker, ensure that the config file and other required files are mounted as a shared volume when running the container.