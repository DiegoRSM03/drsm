/* eslint-disable @typescript-eslint/no-require-imports */
const React = require("react");

function createNavigation() {
  function Link({ href, children, ...props }) {
    return React.createElement("a", { href, ...props }, children);
  }

  function redirect(path) {
    return path;
  }

  function usePathname() {
    return "/";
  }

  function useRouter() {
    return {
      push: () => {},
      replace: () => {},
      back: () => {},
      forward: () => {},
    };
  }

  function getPathname(config) {
    return config.href || "/";
  }

  return { Link, redirect, usePathname, useRouter, getPathname };
}

module.exports = { createNavigation };
