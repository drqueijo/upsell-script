"use client";

import { useState, useEffect } from "react";

const DEFAULT_SCRIPT = `<script>
  var paymentLink = "dbe08145-17d7-43b5-94e1-00b88f202ea1";
  var upsellLink = "https://google.com/";
  var refuseLink = "https://github.com/keoto-tech/keoto-app-ui/pulls";
</script>
<script src="https://static.keoto.com/upsell/keoto-upsell-modal.min.js"></script>`;

const STORAGE_KEY = "keoto-last-script";

export default function Home() {
  const [scriptInput, setScriptInput] = useState(DEFAULT_SCRIPT);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [hasSavedScript, setHasSavedScript] = useState(false);

  // Carregar do localStorage após montagem (client-side only)
  useEffect(() => {
    const savedScript = localStorage.getItem(STORAGE_KEY);
    if (savedScript) {
      // Necessário para sincronizar state com localStorage após hidratação
      setTimeout(() => {
        setScriptInput(savedScript);
        setHasSavedScript(true);
      }, 0);
    }
  }, []);

  const handleLoadScript = () => {
    // Remove scripts antigos
    const oldScripts = document.querySelectorAll("[data-keoto-script]");
    oldScripts.forEach((script) => script.remove());

    // Parse o HTML do script
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = scriptInput.trim();

    const scripts = tempDiv.querySelectorAll("script");

    scripts.forEach((scriptElement) => {
      const newScript = document.createElement("script");
      newScript.setAttribute("data-keoto-script", "true");

      if (scriptElement.src) {
        newScript.src = scriptElement.src;
      } else {
        newScript.textContent = scriptElement.textContent;
      }

      document.body.appendChild(newScript);
    });

    // Salvar script no localStorage
    localStorage.setItem(STORAGE_KEY, scriptInput);
    setHasSavedScript(true);

    setIsScriptLoaded(true);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleClearScript = () => {
    const oldScripts = document.querySelectorAll("[data-keoto-script]");
    oldScripts.forEach((script) => script.remove());
    setIsScriptLoaded(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-zinc-100 font-sans dark:from-zinc-900 dark:to-black">
      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50">
            🧪 Keoto Script Test App
          </h1>
          <p className="mt-2 text-lg text-zinc-600 dark:text-zinc-400">
            Cole seu script, carregue e teste os triggers
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left Panel - Script Input */}
          <div className="flex flex-col gap-4">
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
              <div className="mb-4 flex items-center justify-between gap-2">
                <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                  📝 Cole o Script
                </h2>
                <div className="flex items-center gap-2">
                  {hasSavedScript && (
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                      💾 Salvo
                    </span>
                  )}
                  {isScriptLoaded && (
                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700 dark:bg-green-900 dark:text-green-300">
                      ✓ Carregado
                    </span>
                  )}
                </div>
              </div>

              <textarea
                value={scriptInput}
                onChange={(e) => setScriptInput(e.target.value)}
                placeholder="Cole aqui o script do Keoto..."
                className="mb-4 h-64 w-full rounded-lg border border-zinc-300 bg-zinc-50 p-4 font-mono text-sm text-zinc-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
              />

              <div className="flex gap-3">
                <button
                  onClick={handleLoadScript}
                  className="flex h-12 flex-1 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-6 font-semibold text-white shadow-md transition-all hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>⚡</span>
                  Carregar Script
                </button>

                <button
                  onClick={handleClearScript}
                  disabled={!isScriptLoaded}
                  className="flex h-12 items-center justify-center gap-2 rounded-lg border-2 border-zinc-300 bg-transparent px-6 font-medium text-zinc-700 transition-all hover:border-zinc-400 hover:bg-zinc-100 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-zinc-600 dark:hover:bg-zinc-800"
                >
                  <span>🗑️</span>
                  Limpar
                </button>
              </div>

              {showSuccess && (
                <div className="mt-4 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-800 dark:border-green-800 dark:bg-green-900/20 dark:text-green-300">
                  ✓ Script carregado com sucesso! Teste os botões ao lado.
                </div>
              )}
            </div>

            {/* Instructions */}
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="mb-3 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                📚 Como usar
              </h3>
              <ol className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                <li className="flex gap-2">
                  <span className="font-semibold text-blue-600 dark:text-blue-400">
                    1.
                  </span>
                  Cole o script completo do Keoto no campo acima
                </li>
                <li className="flex gap-2">
                  <span className="font-semibold text-blue-600 dark:text-blue-400">
                    2.
                  </span>
                  Clique em &quot;Carregar Script&quot; para injetá-lo na página
                </li>
                <li className="flex gap-2">
                  <span className="font-semibold text-blue-600 dark:text-blue-400">
                    3.
                  </span>
                  Teste os botões e links no painel ao lado
                </li>
                <li className="flex gap-2">
                  <span className="font-semibold text-blue-600 dark:text-blue-400">
                    4.
                  </span>
                  Modifique o script e recarregue para testar variações
                </li>
              </ol>
            </div>
          </div>

          {/* Right Panel - Test Triggers */}
          <div className="flex flex-col gap-4">
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
              <h2 className="mb-6 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                🎯 Área de Testes
              </h2>

              {/* Test Buttons */}
              <div className="space-y-6">
                <div>
                  <h3 className="mb-3 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Botões de Pagamento
                  </h3>
                  <div className="space-y-3">
                    <button className="keoto-payment-trigger flex h-14 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-8 text-lg font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]">
                      <span>🚀</span>
                      Quero aproveitar esta oferta!
                    </button>

                    <button className="keoto-payment-trigger flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-6 font-semibold text-white transition-all hover:bg-green-700 active:scale-[0.98]">
                      Aceitar Oferta
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="mb-3 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Botões de Recusa
                  </h3>
                  <div className="space-y-3">
                    <button className="keoto-refuse-trigger flex h-14 w-full items-center justify-center rounded-full border-2 border-zinc-300 bg-transparent px-8 text-lg font-medium text-zinc-700 transition-all hover:border-zinc-400 hover:bg-zinc-100 active:scale-[0.98] dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-zinc-600 dark:hover:bg-zinc-800">
                      Não tenho interesse agora
                    </button>

                    <button className="keoto-refuse-trigger flex h-12 w-full items-center justify-center rounded-lg bg-red-600 px-6 font-semibold text-white transition-all hover:bg-red-700 active:scale-[0.98]">
                      Recusar Oferta
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="mb-3 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Links de Teste
                  </h3>
                  <div className="space-y-3">
                    <a
                      href="#"
                      className="keoto-payment-trigger block rounded-lg border border-blue-200 bg-blue-50 p-4 text-center font-medium text-blue-600 transition-colors hover:bg-blue-100 dark:border-blue-900 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/30"
                    >
                      Clique aqui para aceitar →
                    </a>

                    <a
                      href="#"
                      className="keoto-refuse-trigger block rounded-lg border border-zinc-200 bg-zinc-50 p-4 text-center font-medium text-zinc-600 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
                    >
                      Prefiro continuar sem esta oferta
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Classes Info */}
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 dark:border-amber-900 dark:bg-amber-900/20">
              <div className="mb-2 flex items-center gap-2">
                <span className="text-2xl">💡</span>
                <h3 className="font-semibold text-amber-900 dark:text-amber-300">
                  Classes Utilizadas
                </h3>
              </div>
              <div className="space-y-2 text-sm text-amber-800 dark:text-amber-400">
                <div className="flex items-center gap-2">
                  <code className="rounded bg-amber-100 px-2 py-1 font-mono text-xs dark:bg-amber-900">
                    keoto-payment-trigger
                  </code>
                  <span>→ Abre o modal de pagamento</span>
                </div>
                <div className="flex items-center gap-2">
                  <code className="rounded bg-amber-100 px-2 py-1 font-mono text-xs dark:bg-amber-900">
                    keoto-refuse-trigger
                  </code>
                  <span>→ Recusa e redireciona</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
