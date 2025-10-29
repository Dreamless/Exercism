export class Gigasecond {
  private readonly startDate: Date;

  constructor(date: Date) {
    this.startDate = new Date(date.getTime());
  }

  public date(): Date {
    const gigasecondInSeconds = 1000000000;
    const gigasecondInMs = gigasecondInSeconds * 1000;

    const futureTime = this.startDate.getTime() + gigasecondInMs;

    return new Date(futureTime);
  }
}
