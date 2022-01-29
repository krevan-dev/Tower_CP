class AttendeesService {
  async attendEvent() {
    const attendee = await dbContext.Attendee.create()


    removeAttendee() {
      throw new Error('Method not implemented.')
    }

  }

  export const attendeesService = new AttendeesService()
