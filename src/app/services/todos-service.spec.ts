/**
 * This service is not used in the counter app,
 * but here as an example for Jasmine Spies.
 */
class TodoService {
  constructor(
    // Bind `fetch ` to `window` to ensure that `window` is the `this` context
    private fetch = window.fetch.bind(window),
  ) {}

  public async getTodos(): Promise<string[]> {
    const response = await this.fetch('/todos');
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  }
}

// Fake todos and response object
const todos = ['shop groceries', 'mow the lawn', 'take the cat to the vet'];
const okResponse = new Response(JSON.stringify(todos), {
  status: 200,
  statusText: 'OK',
});
const errorResponse = new Response('Not Found', {
  status: 404,
  statusText: 'Not Found',
});

describe('TodoService', () => {
  it('gets the to-dos', async () => {
    // Arrange
    const fetchSpy = jasmine.createSpy('fetch').and.returnValue(okResponse);
    const todoService = new TodoService(fetchSpy);

    // Act
    const actualTodos = await todoService.getTodos();

    // Assert
    expect(actualTodos).toEqual(todos);
    expect(fetchSpy).toHaveBeenCalledWith('/todos');
  });

  it('handles an HTTP error when getting the to-dos', async () => {
    // Arrange
    const fetchSpy = jasmine.createSpy('fetch').and.returnValue(errorResponse);
    const todoService = new TodoService(fetchSpy);

    // Act
    let error;
    try {
      await todoService.getTodos();
    } catch (e) {
      error = e;
    }

    // Assert
    expect(error).toEqual(new Error('HTTP error: 404 Not Found'));
    expect(fetchSpy).toHaveBeenCalledWith('/todos');
  });
});
