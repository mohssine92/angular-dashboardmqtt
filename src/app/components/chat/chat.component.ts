import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChatService } from 'src/app/services/chat.service';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit , OnDestroy {

  texto = '';
  // tomar referencia al observable para unsubcribir al salir de la pagina
  mensajesSubscription!: Subscription;
  elemento!: HTMLElement | null;

  mensajes: any[] = []; // contenedor de mensajes

  constructor( public chatService: ChatService,
               public wsService: WebsocketService // eleminar despeus
    
    ) { }

  ngOnInit(): void {
  
    localStorage.setItem( 'balon', 'init' );

   this.elemento = document.getElementById('chat-mensajes');



   this.mensajesSubscription = this.chatService.getMessages()
      .subscribe( msg => {
        this.mensajes.push( msg );

        setTimeout(() => {
          this.elemento!.scrollTop = this.elemento!.scrollHeight;
        }, 50); // mantener scrol al final

      });

  }

  // parte ciclo de vida de angular , cuando se destroce el componente va a llamar esta funcion
  ngOnDestroy(): void {
    this.mensajesSubscription.unsubscribe();

    localStorage.setItem( 'balon', 'destroy' );

    // const payload = {
    //   de: 'moss',
    //   cuerpo: 'destroy'
    // };

    // this.wsService.emit('ondestroy', payload );

  


  }

  

  enviar(){
    if ( this.texto.trim().length === 0 ) {
      return; // validdar si esta vacio no mande nada
    }

    this.chatService.sendMessage( this.texto );
    this.texto = '';

  }

}
