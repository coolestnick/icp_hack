import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface _SERVICE {
  'deleteThread' : ActorMethod<
    [string],
    { 'Ok' : string } |
      { 'Err' : { 'error' : { 'message' : string } } }
  >,
  'getAssistant' : ActorMethod<
    [],
    { 'Ok' : string } |
      { 'Err' : { 'error' : { 'message' : string } } }
  >,
  'getThread' : ActorMethod<
    [string],
    {
        'Ok' : {
          'id' : string,
          'object' : string,
          'conversation' : Array<
            { 'userInput' : string, 'aiResponse' : string }
          >,
          'created_at' : bigint,
        }
      } |
      { 'Err' : { 'error' : { 'message' : string } } }
  >,
  'getUsername' : ActorMethod<
    [string],
    { 'Ok' : string } |
      { 'Err' : { 'error' : { 'message' : string } } }
  >,
  'hasASavedThread' : ActorMethod<[string], boolean>,
  'saveThread' : ActorMethod<
    [string, string],
    {
        'Ok' : {
          'id' : string,
          'object' : string,
          'conversation' : Array<
            { 'userInput' : string, 'aiResponse' : string }
          >,
          'created_at' : bigint,
        }
      } |
      { 'Err' : { 'error' : { 'message' : string } } }
  >,
  'updateUsername' : ActorMethod<
    [string, string],
    { 'Ok' : string } |
      { 'Err' : { 'error' : { 'message' : string } } }
  >,
}
