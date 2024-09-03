export interface Usecase<InputDto = undefined, OutputDto = void> {
  execute(input: InputDto): Promise<OutputDto>;
}
