export default class Game {

    constructor(x, y, tablero, celulasVivas) {
      this.fila = x;
      this.columna = y;
      this.tablero = tablero;
      this.celulasVivas = celulasVivas;
    }

    crearTablero() {
      let html = "",
        encontrada = undefined,
        estaViva = "";
      for (let i = 0; i < this.fila; i++) {
        for (let j = 0; j < this.columna; j++) {
          encontrada = this.celulasVivas.find((viva) => viva == i + "," + j);
          estaViva = encontrada != undefined ? "vivo" : "";
          html += `<i id='${i},${j}' class=${estaViva}></i>`;
        }
      }
      this.tablero.style =
        "grid-template-columns: repeat(" +
        this.fila +
        ", 20px);grid-template-rows: repeat(" +
        this.columna +
        ", 20px)";
      this.tablero.innerHTML = html;
    }

    buscarCelulas() {
      let vecinos = [];
      let numVecinosVivos = 0;
      for (let i = 0; i < this.fila; i++) {
        for (let j = 0; j < this.columna; j++) {
          vecinos = this.buscarCelulasVecinas(i, j);
          numVecinosVivos = this.buscarCelulasVecinasVivos(vecinos);
          this.actualizarEstado(i + "," + j, numVecinosVivos);
        }
      }
      this.buscarCelulasVivasTotales();
    }

    buscarCelulasVecinasVivos(vecinos) {
      let contador = 0;
      vecinos.forEach((vecino) => {
        if (this.celulasVivas.find((vivo) => vivo == vecino) != undefined) {
          contador++;
        }
      });
      return contador;
    }

    buscarCelulasVecinas(x, y) {
      let vecinos = [];
      let auxY = 0;
      let posicion = x + "," + y;
      x++;
      for (let i = 0; i < 3; i++) {
        auxY = y++;
        for (let j = 0; j < 3; j++) {
          vecinos.push(x + "," + auxY);
          auxY--;
        }
        x--;
      }
      return vecinos.filter((vecino) => vecino != posicion);
    }

    actualizarEstado(coordenada, numeroVecinosVivos) {
      let celula = document.getElementById(coordenada);
      if (celula.classList.contains("vivo")) {
        if (numeroVecinosVivos < 2 || numeroVecinosVivos > 3)
          celula.classList.remove("vivo");
      } else if (numeroVecinosVivos == 2 || numeroVecinosVivos == 3)
        celula.classList.add("vivo");
    }

    buscarCelulasVivasTotales() {
      let vivos = document.getElementsByClassName("vivo");
      this.celulasVivas = [];
      Object.keys(vivos).forEach((element) => {
        this.celulasVivas.push(vivos[element].getAttribute("id"));
      });
    }
  }