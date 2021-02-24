# Demonstration of Continuous Deployment using GitDocumentDB

- This is a site generator ([Gatsby](https://www.gatsbyjs.com/)) from a source files.

![CD using GitDocumentDB](https://github.com/sosuisen/sosuisen-my-inventory-gatsby/blob/main/out/doc/cd/cd.png)

- The source files (JSON) are stored in a Git repository that is created by [Inventory Manager](https://github.com/sosuisen/inventory-manager).
  - Inventory Manager is a demonstration app that creates, reads, updates and deletes items in a local Git repository.
  - Inventory Manager is developed by using a document database named [GitDocumentDB](https://github.com/sosuisen/git-documentdb).
- The local source files are synchronizing with a GitHub repository named [sosuisen-my-inventory](https://github.com/sosuisen/sosuisen-my-inventory).
- The site generator (this repository) is connected to Netlify to generate a Web site automatically.
  - https://www.gatsbyjs.com/docs/how-to/previews-deploys-hosting/deploying-to-netlify/
- The source GitHub repository also triggers the site generator by using GitHub Actions.
  - https://github.com/sosuisen/sosuisen-my-inventory/blob/main/.github/workflows/netlify.yml
- Generated Web site is
  - https://sosuisen-my-inventory.netlify.app/