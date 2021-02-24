# Demonstration of Continuous Deployment using GitDocumentDB

[GitDocumentDB](https://github.com/sosuisen/git-documentdb) is an offline-first DocumentDB using Git, it means that distributed data are consistently synchronized by Git's approach.

Using GitHub and GitDocumentDB is suitable for Continuous Deployment (CD) as shown in the figure below.

Offline-first apps that use a key-value stores will be easier to sync by GitDocumentDB. That is because
- Git is distributed and can be synchronized by nature.
- Local and remote DBs are completely the same database system (Git).
- Git and Git platforms like GitHub are de facto.

![Overview of Continuous Deployment using GitDocumentDB](https://github.com/sosuisen/sosuisen-my-inventory-gatsby/blob/main/out/doc/cd-overview/cd-overview.png)

An example of CD using GitDocumentDB is shown in the next figure.

- **Local App** named **Inventory Manager** is an offline-first CRUD app.
  - Creates, reads, updates and deletes items in a local Git repository
  - THe local Git repository is synchronizing with **Source GitHub repository** named [sosuisen-my-inventory](https://github.com/sosuisen/sosuisen-my-inventory).
  - GitHub actions in **Source GitHub repository** triggers build hooks on push.
    - https://github.com/sosuisen/sosuisen-my-inventory/blob/main/.github/workflows/netlify.yml
- Generator Git repository (exactly **this** repository) contains [Gatsby](https://www.gatsbyjs.com/)) site generator.
  - Generator Git repository has Source Git repository as a Git submodule, so gatsby can get source JSON files by 'git submodule update --remote' command.
- Generated Web site is https://sosuisen-my-inventory.netlify.app/

![CD using GitDocumentDB](https://github.com/sosuisen/sosuisen-my-inventory-gatsby/blob/main/out/doc/cd/cd.png)
