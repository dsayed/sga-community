"use client";

import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const DISMISS_KEY = "sga-install-dismissed";

export function PwaInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showIosBanner, setShowIosBanner] = useState(false);
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    // Don't show if already dismissed or running as standalone PWA
    if (localStorage.getItem(DISMISS_KEY)) return;
    if (window.matchMedia("(display-mode: standalone)").matches) return;

    setDismissed(false);

    // Android/Chrome: listen for beforeinstallprompt
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", handler);

    // iOS Safari detection
    const isIos = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isSafari = /Safari/.test(navigator.userAgent) && !/CriOS|FxiOS|Chrome/.test(navigator.userAgent);
    if (isIos && isSafari) {
      setShowIosBanner(true);
    }

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  function dismiss() {
    localStorage.setItem(DISMISS_KEY, "1");
    setDismissed(true);
    setDeferredPrompt(null);
    setShowIosBanner(false);
  }

  async function handleInstall() {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      dismiss();
    }
  }

  if (dismissed || (!deferredPrompt && !showIosBanner)) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 z-50 md:left-auto md:right-4 md:bottom-4 md:w-80 animate-fade-in">
      <div className="card p-4 shadow-lg border border-sga-border">
        <div className="flex items-start gap-3">
          <img src="/images/sga-logo.png" alt="" className="w-10 h-10 shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-sga-text mb-0.5">
              Install SGA Community
            </p>
            {deferredPrompt ? (
              <p className="text-xs text-sga-text-secondary mb-3">
                Add to your home screen for a better experience.
              </p>
            ) : (
              <p className="text-xs text-sga-text-secondary mb-3">
                Tap <span className="inline-block mx-0.5">⎙</span> Share then &quot;Add to Home Screen&quot;
              </p>
            )}
            <div className="flex gap-2">
              {deferredPrompt && (
                <button
                  type="button"
                  onClick={handleInstall}
                  className="px-3 py-1.5 bg-sga-orange text-white text-xs font-semibold rounded-lg"
                >
                  Install
                </button>
              )}
              <button
                type="button"
                onClick={dismiss}
                className="px-3 py-1.5 text-xs font-semibold text-sga-text-secondary"
              >
                Not now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
