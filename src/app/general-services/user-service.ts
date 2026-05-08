import { Injectable } from '@angular/core';
import { Cell, User, UserAccount } from '@shared/entities';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly Me: User = Object()

  readonly MyAccount: UserAccount = Object()

  get Cell_ID () {
    const {currentLeadership, currentMembership} = this.MyAccount

    if(currentLeadership) {
      return currentLeadership.cell_id ?? 0
    }else if(currentMembership) {
        return currentMembership.cell_id ?? 0
    }else {
      return 0
    }
  }

  get MyCell () {
    const {currentLeadership, currentMembership} = this.MyAccount

    return currentLeadership?.cell ?? currentMembership?.cell
  }

  loggedIn () {
    return Object.entries(this.MyAccount).length > 0
  }

  setMyAccount (account: UserAccount) {
    Object.assign(this.Me, account.user)
    
    Object.assign(this.MyAccount, account)
  }

  userIsAnActiveLeader() {
    const {currentLeadership} = this.MyAccount

    return !currentLeadership != true
  }

  reset () {
    Object.keys(this.Me).forEach(key => delete (this.Me as any)[key])

    Object.keys(this.MyAccount).forEach(key => delete (this.MyAccount as any)[key])
  }
}