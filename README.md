## DOCKER-COMPOSE

Docker Compose es una herramienta para definir y ejecutar aplicaciones de Docker de uno varios contenedores en forma DECLARATIVAPOR mediante un archivo YAML para configurar los servicios de la aplicación. Después, con un solo comando, se crean y se inician todos los servicios

## YAML

YAML es un lenguaje de representación/serialización de datos que las personas pueden leer y comprender. Suele utilizarse en el diseño de archivos de configuración. YAML Ain’t Markup Language que se traduce como "YAML no es un lenguaje de marcas" refiriéndose que solo resembla a uno.

En su aspecto mas esencial define una jerarquía de pares `clave-valor` utilizando la indentación.

Indentación es un anglicismo de la palabra indentation cuya traducción es sangría

Es análogo a JSON, otro lenguaje de serialización/representación de datos.

YAML utiliza una extensión de archivos `.yml` o `.yaml` y sigue reglas de sintaxis específicas.

### Tipos de dato

- Escalares : Valores simples
  - Numéricos
  - String / Cadenas de caracteres
- Listas: Es un array | vector | arreglo
- Diccionarios: arreglo del tipo `clave-valor`

```yaml
#Comentario: ESTE ES EL FORMATO DE OCMENTARIO, SOLO SE SOPORTA UNA SOLA LINEA
escalares:
# ESCALARES NUMERICOS
  numericos:
    subject1: 70
    # punto separador decimal, sin separador de miles
    subject3: 100.0000
# ESCALARES: STRINGS
  string:
    string-simple: the cost is 390
    string-simple2: "the cost is 390"
    string-simple-linea-de-escape: "the cost is 390\n"
    milti-linea-str: |
      ESTE TEXTO OCUPA VARIA LINEAS
      ESTA ES LA SEGUNDA Y TERCERA
      LINEA
    milti-linea-str2: >
      ESTE ES OTROTEXTO QUE
      OCUPA VARIA LINEAS
      ESTA ES LA SEGUNDA Y TERCERA
      LINEA
    str3: null
    str4: ~
# LISTAS
listas:
  ejemplo1:
    items: [6, 7, 8, 9, 10]
    name: [six, seven, eight, nine, ten]
  ejemplo2:
    items:
    - 6
    - 7
    - 8
    name:
      - "six"
      - "seven"
      - "eight"
      - "nine"
    objetos:
      - name: "escriorio"
        pesoKg: 15
      - name: "heladera"
        pesoKg: 30
# DICCIONARIO
diccionario:
  students:
    - name : "jane"
      age: 23
      hobbies:
        - jiu-jitsu
        - mma
        - running
    - name : "john"
      age: 25
      hobbies:
        - music
        - reading
        - dancing
  classes:
    - name : "Operations"
      days: [mon]
      start: 18
      end: 22
    - name : "Software Archiqtecture"
      days: [mon]
      start: 18
      end: 22
```

## DOCKER - COMPOSE

Para iniciar los contenedores , posiciónese en la carpeta que contiene el archivo `docker-compose.yaml` y ejecute el comando.

```bash
docker-compose up -d
```

## Puertos

La mayoría de los servicios expone puertos TCP/UDP (ver capa 4 modelo OSI) a fin de exponer una API que le permita interactuar con otros componentes de software.

Tanto en Docker como Docker Compose se pueden *mapear* puertos expuestos por los contenedores con puertos de la maquina host.

El Mapeo es `PUERTO_HOST:PUERTO_CONTENEDOR`.

---

**IMPORTANTE** :  Si bien cada contenedor tiene una interface de red virtual, la maquina HOST tiene una unica interface. Cada vez que un contenedor o programa toma un puerto en la PC local, dicho puerto, no puede ser utilizado por otro programa.

---

El siguiente ejemplo de `docker-compose`muestra el mapeo del puerto 80 del contenedor `web` al puerto 8080 del host

```yaml
services:
  web:
    image: nginx:latest
    restart: unless-stopped
    ports:
      - 8080:80
```

En forma IMPERATIVA seria algo así

```bash
docker run –d  -p 8080:80 --name web  --restart=unless-stopped nginx:latest
```

## Volúmenes

Dada la naturaleza efímera de los contenedores Docker provee de mecanismos para persistir información del sistema de archivos. Docker nos permite mapear carpetas o directorios dentro del contenedor utilizando dos técnicas.

- **Bind Mount:** Se "enlaza" una carpeta o directorio del sistema de archivos del contenedor al sistema de archivos del host

- **Volume Mount:** Se "enlaza" una carpeta o directorio del sistema de archivos del contenedor a una entidad manejada por DOcker denominada Volumen. Estos volúmenes son independientes de la vida del contenedor y están aislados del sistema host (lo que los hace mas seguros). Se pueden compartir con otros contenedores para la aplicación de distintas técnicas. ANTES DE UTILIZAR UN VOLUMEN DEBE SER DECLARADO O CREADO EN DOCKER (en modo imperativo se debe crear ante, en modo declarativo debe declararse)

Ejemplo de bind mount donde se monta el directorio `site-content`  de la PC HOST con el directorio `/usr/share/nginx/html`

```yaml
services:
  web:
    image: nginx:latest
    restart: unless-stopped
    ports:
      - 8080:80
    volumes:
      - ./site-content:/usr/share/nginx/html
```

Ejemplo de volume mount donde se crea el volumen `mongo2-volume` y se lo mapea al directorio del contenedor `/data/db`

```yaml
services:

  mongodb:
    image: mongo:6-jammy
    ports:
      - '27018:27017'
    volumes:
      - mongo2-volume:/data/db
    restart: unless-stopped
    environment:
      - MONGO_INITDB_DATABASE=ope
      - MONGO_INITDB_ROOT_USERNAME=admin
      - MONGO_INITDB_ROOT_PASSWORD=secretos
volumes:
  mongo2-volume:
```

## Variables den entorno

Las variables de entorno almacenan es un valor con nombre (DE AHI EL NOMBRE VARIABLE) que se fija a nivel de sistema operativo (de ahi el nombre ENTORNO). Por ejemplo, la `WINDIR` variable de entorno contiene la ubicación del directorio de instalación de Windows. Los programas pueden consultar el valor de esta variable para determinar dónde se encuentran los archivos del sistema operativo Windows.

Si se ejecuta el comando `echo %WINDIR%`en la linea de comandos de Windows retornara el valor de la variable de entorno

```bash
$ echo %WINDIR%
C:\Windows
```

En Docker cada contenedor tiene sus propias variables de entorno que no son compartidas con NADA. Es un mecanismo para CONFIGURAR el contenedor, su utilización dependerá de como ha sido empaquetada y programada la imagen del contenedor.
