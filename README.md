### Steps to get it working in local
1. Install docker
2. In root folder: 
    1. `docker run -it --rm -v $PDW:/app -w /app node:lts-slim bash`
    2. `yarn`
    3. `exit`
    4. `docker-compose up -d`
    5. `mv .env.example`
