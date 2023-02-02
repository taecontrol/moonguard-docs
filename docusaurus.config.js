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
          routeBasePath: '/'
        },
        blog: false,
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "",
        logo: {
          alt: "Moonguard Logo",
          src: "img/logo.svg",
          srcDark: "img/logoDark.svg",
        },
        items: [
          {
            type: "doc",
            docId: "intro",
            position: "left",
            label: "Docs",
          },
        ],
      },
      footer: {
        style: "dark",
        copyright: `Copyright © ${new Date().getFullYear()} Moonguard.`,
      },
      prism: {
        additionalLanguages: ['php', 'bash'],
        darkTheme: darkCodeTheme,
      },
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: true,
      }
    }),
};

module.exports = config;
