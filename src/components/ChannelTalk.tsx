"use client";

import { useEffect } from "react";

export default function ChannelTalk() {
  useEffect(() => {
    (function () {
      const w = window as any;
      if (w.ChannelIO) return;

      const ch = function (...args: any[]) {
        ch.c(args);
      } as any;
      ch.q = [] as any[];
      ch.c = function (args: any) {
        ch.q.push(args);
      };
      w.ChannelIO = ch;

      const s = document.createElement("script");
      s.type = "text/javascript";
      s.async = true;
      s.src = "https://cdn.channel.io/plugin/ch-plugin-web.js";
      const x = document.getElementsByTagName("script")[0];
      x?.parentNode?.insertBefore(s, x);

      s.onload = () => {
        w.ChannelIO("boot", {
          pluginKey: "32645679-1616-40ff-baf5-91bb04842396",
        });
      };
    })();

    return () => {
      const w = window as any;
      if (w.ChannelIO) {
        w.ChannelIO("shutdown");
      }
    };
  }, []);

  return null;
}
