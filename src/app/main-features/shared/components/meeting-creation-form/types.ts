import { MeetingAgenda } from "@shared/entities";

export type MeetingCreationFormAgendaManagerOptions = {
    meeting_start_time: Date;
    meeting_end_time: Date;
    meeting_agendas: MeetingAgenda[];
    index_of_agenda_to_edit?: number;
    mode: "create" | "edit";
    edit_cb?: (result: MeetingAgenda[]) => void;
    agenda_creation_cb?: (agenda: MeetingAgenda) => void;
    void?: () => void;
}