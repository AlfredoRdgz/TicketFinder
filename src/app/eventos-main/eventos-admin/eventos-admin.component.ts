import { Component, OnInit } from '@angular/core';
import { Evento } from '../Evento';
import { EventoServiceService } from '../evento-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-eventos-admin',
  templateUrl: './eventos-admin.component.html',
  styleUrls: ['./eventos-admin.component.css']
})
export class EventosAdminComponent implements OnInit {

  eventos:Evento[];
  formulario:FormGroup;

  constructor(private eventoService:EventoServiceService) { }

  ngOnInit() {
    this.eventoService.obtenerEventos().then((lista:Evento[])=> this.eventos = lista).catch((lista:Evento[])=> this.eventos = lista);
    this.formulario = new FormGroup({
      nombre:new FormControl('',[Validators.required]),
      descripcion:new FormControl('',[Validators.required]),
      fecha: new FormControl('',[Validators.required]),
      hora: new FormControl('',[Validators.required]),
      lugar: new FormControl('',[Validators.required]),
      filas: new FormControl('',[Validators.required]),
      asientosXFila: new FormControl('',[Validators.required])
    });
  }

  altaEvento(){
    let valorFormulario = this.formulario.value;
    this.eventoService.agregarEvento(valorFormulario.nombre,valorFormulario.descripcion,valorFormulario.fecha,valorFormulario.hora,valorFormulario.lugar,valorFormulario.filas,valorFormulario.asientosXFila);
    this.formulario.reset();
  }

}
