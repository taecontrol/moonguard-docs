// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const darkCodeTheme = require("prism-react-renderer/themes/palenight");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Docs",
  tagline: "Don't miss your site status.",
  url: "https://docs.moonguard.dev/",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "taecontrol", // Usually your GitHub org/user name.
  projectName: "moonguard-docs", // Usually your repo name.
  trailingSlash: false,
  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          routeBasePath: "/",
        },
        blog: false,
        theme: {
          customCss: [
            require.resolve("./src/css/custom.css"),
            require.resolve("./src/css/code.css")
          ],
        },
      }),
    ],
  ],

  scripts: [
    {
      src: 'https://analytics.taecontrol.com/script.js',
      defer: true,
      'data-website-id': 'e86b7d19-394a-4e6c-a4a4-dd78952ba52b'
    }
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: "/img/preview.jpg",
      metadata: [
        {
          name: "keyboards",
          content: "MoonGuard, docs, laravel, php, package, composer, artisan",
        },
      ],
      navbar: {
        title: "",
        logo: {
          alt: "Moonguard Imagotype",
          src: "img/imagotype.png",
          srcDark: "img/imagotype.png",
          href: 'https://moonguard.dev'
        },
        items: [
          {
            type: "doc",
            docId: "intro",
            position: "left",
            label: "Home",
          },
          {
            type:"docsVersionDropdown",
            position: "right",
          }
        ],
      },
      footer: {
        style: "dark",
        copyright: `Copyright © ${new Date().getFullYear()} Moonguard.`,
      },
      prism: {
        additionalLanguages: ["php", "bash"],
        darkTheme: darkCodeTheme,
      },
      colorMode: {
        defaultMode: "dark",
        disableSwitch: true,
      },
    }),
};

module.exports = config;
