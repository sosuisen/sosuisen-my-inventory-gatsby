module.exports = {
  siteMetadata: {
    title: "My Inventory Site",
  },
  plugins: [
    'gatsby-transformer-json',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: 'item',
        path: `${__dirname}/src/json/item/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: 'box',
        path: `${__dirname}/src/json/box/`,
      },     
    },  
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: 'work',
        path: `${__dirname}/src/json/work/`,
      },     
    },        
  ],
};
