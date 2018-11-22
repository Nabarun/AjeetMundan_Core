import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { Team } from './team.model';
import 'rxjs/add/operator/map';

@Injectable()

export class TeamService {

  constructor(private af: AngularFireDatabase) { }

  team: FirebaseListObservable<Team[]> = this.af.list('specialist', { preserveSnapshot: true });

  /**
   *  Return list of team members
   */
  all() {
    return this.af.list('specialist')
      .map((team: Team[]) => {
        return team.filter(team => team.status === 'publish')
      })
  }
}
