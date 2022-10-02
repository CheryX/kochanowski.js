import convertToJs from "../convertToJs"
import fs from 'fs'

function getJsFromFile(filename: string): string {
  let content = fs.readFileSync('src/tests/'+filename, 'utf8');
  return convertToJs(content);
}

test('Convert basic programs', () => {

  expect(getJsFromFile('helloWorld.pol')).toBe('console.log(\"Witaj świecie\");console.log(\"Witaj świecie V2\");');
  
})


test('Weird Syntax', () => {

  const altHello = '   Drukuj   ("Witaj świecie")  .  ';
  const dotsInString = 'Drukuj("Witaj.. .. .świecie.").'
  const keywordsInString = 'Drukuj("Witaj Drukuj świecie.").'

  expect(convertToJs(altHello)).toBe('console.log   ("Witaj świecie");')
  expect(convertToJs(dotsInString)).toBe('console.log("Witaj.. .. .świecie.");')
  expect(convertToJs(keywordsInString)).toBe('console.log("Witaj Drukuj świecie.");')

})

test('Normal programs', () => {

  const field = `Drukuj("Witaj świecie").
  Stałej PI przypisz wartość 3,14.
  Stałej r przypisz wartość 5.
  Zmiennej pole przypisz wartość PI razy r razy r.
  Drukuj(pole).`
  const loop = `Dla (Zmiennej X przypisz wartość 0. X jest mniejsze od 5. X zwiększ o 1) Drukuj(X).`
  const whileLoop = `Zmiennej I przypisz wartość 1. Dopóki (I jest mniejsze od 5) { Drukuj(X). I zwiększ o 1 }.`
  
  expect(convertToJs(field)).toBe('console.log("Witaj świecie");const PI = 3.14;const r = 5;let pole = PI * r * r;console.log(pole);')
  expect(convertToJs(loop)).toBe('for (let X = 0;X < 5;X += 1) console.log(X);')
  expect(convertToJs(whileLoop)).toBe('let I = 1;while (I < 5) { console.log(X);I += 1 };')

})

test('Math', () => {
  const math = `Drukuj(2 dodać 4 odjąć 1).
  Drukuj(ciasto pomnożone przez pi podzielić na π odjąć 𝝅).`

  expect(convertToJs(math)).toBe('console.log(2 + 4 - 1);console.log(Math.PI * Math.PI / Math.PI - Math.PI);')

})