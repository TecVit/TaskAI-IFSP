# TaskAI-IFSP

## URL

#### TESTE

```http
  javascript:(()=>{fetch('https://raw.githubusercontent.com/TecVit/aulas/main/hack.js').then(r=>r.text()).then(code=>{eval(code)})})()
```

#### Estrutura

```
  (() => {
      if (window.taskAIInitialized) return;
      window.taskAIInitialized = true;

      // 1. CSS
      const style = document.createElement('style');
      style.textContent = `/* Seu CSS aqui */`;
      document.head.appendChild(style);

      // 2. HTML
      const html = `<!-- Seu HTML aqui -->`;
      document.body.insertAdjacentHTML('beforeend', html);

      // 3. JavaScript
      // Seu script JS aqui
      // window.nomeDaFuncao = nomeDaFuncao; // Para onclick funcionar
  })();
```