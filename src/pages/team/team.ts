import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { TeamService } from './team.service';
import { Team } from './team.model';

@IonicPage({
  name: 'team',
  defaultHistory: ['home']
})
@Component({
  selector: 'page-team',
  templateUrl: 'team.html'
})
export class TeamPage {

  public members: Array<Team>;
  constructor(private teamService: TeamService) { }

  ngOnInit(){
    this.allTeamMembers();
  }

  allTeamMembers(){
    this.teamService.all().subscribe(res => {
      this.members = res;
    })
  }
}
