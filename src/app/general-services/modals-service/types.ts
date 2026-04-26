import { Component, ComponentRef } from "@angular/core"

export type QueuedModalConfigs <Option = unknown> = {
    comp: Component,
    inputs: any,
    options?: Option
}

export type ModalCreationOption = {
    doNotAnimate?: boolean
}

export type CurrentModalSnapShot<Instance, Option> = {newCompRef: ComponentRef<Instance>, options?: Option}