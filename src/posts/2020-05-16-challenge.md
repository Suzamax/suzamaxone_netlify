---
path: quick-challenge
date: '2020-05-16T09:56:56.932Z'
title: Un pequeño reto
description: ¿Serás capaz de resolverlo?
hero_image: '/assets/thinking.png'
language: Español
---
Recientemente me topé con [este tweet](https://twitter.com/iordic/status/1250493045944070150) y no pude resistirme a averiguar qué era.

Quizá me compliqué más de la cuenta al principio usando los dos *tweets* pero conseguí resolverlo al final, cuando me percaté de que era solo el primero.

## Averiguando qué es

En primer lugar, se nota que es hexadecimal. Tras ello, te das cuenta de que debes pasarlo a ASCII, y entonces te encuentras con un fragmento de texto sospechoso y un montón de hexadecimal.

![](/assets/captura-de-pantalla-2020-05-16-a-las-12.36.01.png "El texto en ASCII. Nótese el fragmento sospechoso.")

El texto sospechoso resultó estar en Base64, del cual obtenemos esto:

![](/assets/captura-de-pantalla-2020-05-16-a-las-12.17.46.png "¡Una pista!")

Vaya... Así que puede ser código ensamblador de arquitectura x86, ¿eh?

## Obteniendo el código ensamblador

El contenido después de la flecha está en hexadecimal, así que posiblemente será el código en ensamblador.

Me dirijo a [ODA - The Online Disassembler](https://onlinedisassembler.com/odaweb/) e introduzco como código i386 esa cadena hexadecimal.

¡Bingo! Resulta ser ensamblador.

Por lo tanto, obtengo el dump y entonces me dispongo a averiguar qué es.

![](/assets/captura-de-pantalla-2020-05-16-a-las-12.07.02.png "El dump solamente con el código ensamblador")

## Resolviendo el enigma

Veo que primero se añade el valor `0x60` al registro `ebx`. Esto es importante.

Todos los valores 0xHH y 0xH son valores ASCII. Entonces cada vez que se introduce en `eax` un valor 0xH, es para luego añadirle el `0x60` almacenado en `ebx`. Si el valor es 0xHH va aparte.

Entonces, nos queda `\x44\x69\x20\x68\x6f\x6c\x61` que en ASCII es "Di hola".

Así que, **hola Jordi**.