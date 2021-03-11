# Demonstration of Continuous Deployment using GitDocumentDB

[GitDocumentDB](https://github.com/sosuisen/git-documentdb) is an offline-first DocumentDB using Git, it means that distributed data are consistently synchronized by Git's approach.

Using GitHub and GitDocumentDB is suitable for Continuous Deployment (CD) as shown in the figure below.

An offline-first app that uses a key-value store will be easier to sync by GitDocumentDB. That is because ...
- Git is distributed and can be synchronized by nature.
- Local and remote DBs use completely the same database system (Git).
- Git and Git platforms like GitHub are de facto.

![Overview of Continuous Deployment using GitDocumentDB](https://github.com/sosuisen/sosuisen-my-inventory-gatsby/blob/main/out/doc/cd-overview/cd-overview.png)

An example of CD using GitDocumentDB is shown in the next figure.

- **Electron App** named **[Inventory Manager](https://github.com/sosuisen/inventory-manager)** is an offline-first CRUD app.
  - It creates, reads, updates and deletes items in a local Git repository
  - The local Git repository is synchronizing with Source Git repository on GitHub.
- **Source Git repository** named [sosuisen-my-inventory](https://github.com/sosuisen/sosuisen-my-inventory) uses GitHub actions to start a site generator on Netlify by webhook.
    - https://github.com/sosuisen/sosuisen-my-inventory/blob/main/.github/workflows/netlify.yml
- **Generator Git repository** named [sosuisen-my-inventory-gatsby](https://github.com/sosuisen/sosuisen-my-inventory-gatsby) (exactly you are here) contains [Gatsby](https://www.gatsbyjs.com/) site generator.
  - Generator Git repository has Source Git repository as a Git submodule, so gatsby can get source JSON files by 'git submodule update --remote' command.
- Netlify is connected to Generator Git repository by GitHub Apps.
  - GitHub Apps read Generator Git repository and run Gatsby when triggered by push.
- Generated Web site is https://sosuisen-my-inventory.netlify.app/

<img src="https://github.com/sosuisen/sosuisen-my-inventory-gatsby/blob/main/out/doc/cd/cd.png" alt="CD using GitDocumentDB" width="480">
