class UserDto {
  public email: string;
  public id: string;
  public isActivated: boolean;

  constructor(model) {
    this.email = model.email;
    this.id = model._id;
    this.isActivated = model.isActivated;
  }
}

export default UserDto;
