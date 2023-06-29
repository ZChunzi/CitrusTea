// teaRenderer.js

export async function fetchJS(url) {
    try {
    const response = await fetch(url);
    return await response.text();
  } catch (error) {
    console.error('Failed to fetch JavaScript file:', error);
  }
  }
  
  export function insertJS(code) {
    const script = document.createElement('script');
    script.innerHTML = code;
    document.body.appendChild(script);
  }
  
  export function renderTea(teaPath) {
    const jsPath = '/view/' + teaPath;
  
    fetchJS(jsPath)
      .then(jsCode => {
        insertJS(jsCode);
      })
      .catch(error => {
        console.error('Failed to render tea template:', error);
      });
  }