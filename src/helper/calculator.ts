export const calculateExpression = (expression: string) => {
  const mulRegex = /×/g;
  const divRegex = /÷/g;
  const divideByZero = /\/0/g;

  const toEvaluate = expression.replace(mulRegex, "*").replace(divRegex, "/");

  try {
    if (divideByZero.test(toEvaluate)) {
      throw new Error("Can not divide by 0!");
    }
    return eval(toEvaluate);
  } catch (err) {
    console.error(err);
    return undefined;
  }
};
