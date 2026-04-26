import { Injectable } from '@angular/core';
import { User, UserAccount } from '@shared/entities';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly Me: User = Object()

  readonly MyAccount: UserAccount = Object()

  get Cell_ID () {
    const {leadership, membership} = this.MyAccount

    if(leadership) {
      return leadership.cell_id ?? 0
    }else if(membership) {
      const currentMembership = membership[0]

      if(currentMembership) 
        return currentMembership.cell_id ?? 0

      return 0
    }else {
      return 0
    }
  }

  loggedIn () {
    return Object.entries(this.MyAccount).length > 0
  }

  setMyAccount (account: UserAccount) {
    Object.assign(this.Me, account.user)
    
    Object.assign(this.MyAccount, account)
  }

  userIsAnActiveLeader() {
    const {leadership} = this.MyAccount

    return !leadership != true
  }

  reset () {
    Object.keys(this.Me).forEach(key => delete (this.Me as any)[key])

    Object.keys(this.MyAccount).forEach(key => delete (this.MyAccount as any)[key])
  }
}