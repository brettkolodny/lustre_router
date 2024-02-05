import gleam/uri.{type Uri}
import lustre/effect as e

pub fn init(wrapper: fn(Uri) -> msg) -> e.Effect(msg) {
  let fun = fn(dispatch) {
    init_(fn(uri_string) {
      case uri.parse(uri_string) {
        Ok(uri) ->
          uri
          |> wrapper
          |> dispatch
        _ -> Nil
      }
    })
  }

  e.from(fun)
}

@external(erlang, "./ffi.mjs", "init")
@external(javascript, "./ffi.mjs", "init")
fn init_(wrapper: fn(String) -> Nil) -> msg
