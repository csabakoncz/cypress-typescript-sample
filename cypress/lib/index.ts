import addContext = require("mochawesome/addContext");

Cypress.on("test:after:run", (test, runnable: Suite) => {
    console.log("addContext", addContext)
    if (test.state === "failed") {
        const screenshot = `../../screenshots/${Cypress.spec.name}/${getSuitePath(runnable.parent)} -- ${sanitize(test.title)} (failed).png`;
        console.log('screenshot', screenshot)
        addContext({ test }, screenshot);
    }
});

interface Suite{
  title: string,
  parent: Suite
}

function getSuitePath(runnable: Suite){
  const path=[];
  while(runnable.title){
    path.push(sanitize(runnable.title))
    runnable = runnable.parent;
  }
  let pathStr = path.reverse().join(' -- ');
  pathStr = sanitize(pathStr, [/\./g]);
  return pathStr;
}

function sanitize(testTitle: string, extraPatterns: RegExp[] = []){
  const patterns = [
    /\//g,
    /\?/g,
    /\</g,
    /\>/g,
    /\\/g,
    /:/g,
    /\*/g,
    /\|/g,
    /"/g
  ];

  patterns.concat(extraPatterns).forEach(p=>{
    testTitle = testTitle.replace(p,'');
  })
  testTitle=testTitle.trim();

  return testTitle;

}