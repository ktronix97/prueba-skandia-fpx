import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-goal-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './goal-card.component.html',
  styleUrls: ['./goal-card.component.scss']
})
export class GoalCardComponent {
  goal = {
    title: 'Conocer mi sobrino',
    category: 'Bienestar',
    date: 'Diciembre/2022',
    target: 6000000,
    current: 0
  };
}
