export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'deleteThread' : IDL.Func(
        [IDL.Text],
        [
          IDL.Variant({
            'Ok' : IDL.Text,
            'Err' : IDL.Record({
              'error' : IDL.Record({ 'message' : IDL.Text }),
            }),
          }),
        ],
        [],
      ),
    'getAssistant' : IDL.Func(
        [],
        [
          IDL.Variant({
            'Ok' : IDL.Text,
            'Err' : IDL.Record({
              'error' : IDL.Record({ 'message' : IDL.Text }),
            }),
          }),
        ],
        ['query'],
      ),
    'getThread' : IDL.Func(
        [IDL.Text],
        [
          IDL.Variant({
            'Ok' : IDL.Record({
              'id' : IDL.Text,
              'object' : IDL.Text,
              'conversation' : IDL.Vec(
                IDL.Record({ 'userInput' : IDL.Text, 'aiResponse' : IDL.Text })
              ),
              'created_at' : IDL.Nat64,
            }),
            'Err' : IDL.Record({
              'error' : IDL.Record({ 'message' : IDL.Text }),
            }),
          }),
        ],
        ['query'],
      ),
    'getUsername' : IDL.Func(
        [IDL.Text],
        [
          IDL.Variant({
            'Ok' : IDL.Text,
            'Err' : IDL.Record({
              'error' : IDL.Record({ 'message' : IDL.Text }),
            }),
          }),
        ],
        ['query'],
      ),
    'hasASavedThread' : IDL.Func([IDL.Text], [IDL.Bool], ['query']),
    'saveThread' : IDL.Func(
        [IDL.Text, IDL.Text],
        [
          IDL.Variant({
            'Ok' : IDL.Record({
              'id' : IDL.Text,
              'object' : IDL.Text,
              'conversation' : IDL.Vec(
                IDL.Record({ 'userInput' : IDL.Text, 'aiResponse' : IDL.Text })
              ),
              'created_at' : IDL.Nat64,
            }),
            'Err' : IDL.Record({
              'error' : IDL.Record({ 'message' : IDL.Text }),
            }),
          }),
        ],
        [],
      ),
    'updateUsername' : IDL.Func(
        [IDL.Text, IDL.Text],
        [
          IDL.Variant({
            'Ok' : IDL.Text,
            'Err' : IDL.Record({
              'error' : IDL.Record({ 'message' : IDL.Text }),
            }),
          }),
        ],
        [],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
