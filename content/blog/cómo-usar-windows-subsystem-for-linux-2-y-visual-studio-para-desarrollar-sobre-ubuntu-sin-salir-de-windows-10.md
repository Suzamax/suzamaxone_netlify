---
path: wsl-visual-studio
date: 2020-10-02T13:36:39.360Z
title: Cómo usar Windows Subsystem for Linux 2 y Visual Studio para desarrollar
  sobre Ubuntu sin salir de Windows 10
description: Un pequeño tutorial para desarrollar de forma cómoda en Linux sin
  salir de Windows
---
Muchos me habéis pedido que realizara un artículo para poder desarrollar vuestros programas nativos en Linux (Ubuntu, por ejemplo) sin necesidad de reiniciar y, a ser posible, utilizar el entorno que nos provee Microsoft (Visual Studio 2019 actualmente).

Es por ello que he redactado este artículo para ilustraros cómo se configura vuestro equipo para desarrollar en C++ para Linux sin salir de Windows. Vamos allá.

## Instalación de WSL2

Me basaré en [este artículo de MSDN](https://docs.microsoft.com/en-us/windows/wsl/install-win10) para explicaros la instalación. Es muy sencilla y solo tenéis que abrir un PowerShell como administrador.

1. **IMPORTANTE**: aseguraos de tener actualizado vuestro equipo. Windows 10 debe ser la *build* 18362 como mínimo.
2. Tras abrir nuestra consola de PS como Administrador, ejecutamos el siguiente comando: `dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart`
3. Para activar la versión 2 (con el anterior comando solo activaríamos WSL 1) deberemos ejecutar esto: `dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart` \ Es decir: activar la opción de plataforma de máquina virtual. Por ello deberemos reiniciar el ordenador tras ejecutarlo.
4. Descargaos [esto](https://wslstorestorage.blob.core.windows.net/wslblob/wsl_update_x64.msi) e instaladlo para obtener el último kernel Linux.
5. Configurad WSL 2 como subsistema por defecto: `wsl --set-default-version 2`
6. Instalad la distro que os apetezca desde la Microsoft Store. Os recomiendo Ubuntu 20.04 o Debian.
7. Al ejecutar por primera vez una distro, os pedirá configurar la contraseña de UNIX. Y ya está, ya tenéis WSL 2 configurado e integrado.
8. Añadid las herramientas para desarrollo: `sudo apt install g++ gdb make ninja-build rsync zip`

## Configurar Visual Studio para usar el subsistema

**Importante**: necesitáis tener herramientas para ello. En Visual Studio Installer procurad instalar la herramienta **Desarrollo de Linux con C++**.

![Ventana de Visual Studio Installer para seleccionar nuestra opción (abajo del todo)](assets/opcion_linux.png "Ventana de Visual Studio Installer para seleccionar nuestra opción (abajo del todo)")

Primero, cread un proyecto y buscad Linux C++.

![Proyecto vacío de Linux](assets/void_linux.png "Proyecto vacío de Linux")

Cuando lo tengáis creado, al crear vuestros ficheros *.cpp* y programarlos, habrá que compilarlos. Tendréis que configurar el proyecto para que utilice WSL. Abajo a la derecha tenéis la microventana de Propiedades:

![Aquí están las propiedades del proyecto](assets/propiedades.png "Aquí están las propiedades del proyecto")

Abrid las páginas de propiedades. Entonces aparecerá esta ventana:

![Ventana ya editada. Configurad tanto Debug como Release.](assets/configure.png "Ventana ya editada. Configurad tanto Debug como Release.")

Configurada tal y como aparece, porque por defecto apuntará a un servidor remoto. Configuradlo para GCC for Windows Subsystem for Linux, y la ruta al sistema buscadla en vuestro directorio `%APPDATA%\..\Local\Microsoft\WindowsApps`, en mi caso es `ubuntu2004.exe`.

Configurad IntelliSense para que use los valores, y listo.

Para ejecutarlo, compilad el programa. En Ver > Terminal (o Ctrl + Ñ) se abrirá un PowerShell para desarrolladores, abrid `bash` y ejecutad `./bin/x64/Release|Debug/<nombre_del_fichero>.out`

Con esto espero que quede claro cómo utilizar Visual Studio Community y WSL2. Cualquier duda comentádmela por Telegram o Twitter.

¡Saludos, desarrolladores!