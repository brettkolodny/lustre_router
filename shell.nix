with import <nixpkgs> {};

mkShell {
    buildInputs = [
      nodejs_18
      helix
      yarn
      gleam
      erlang
      elixir_1_16
      cheat
      bat
      nodePackages.typescript-language-server
    ];
  }

