{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  buildInputs = [
    pkgs.vim
    pkgs.zellij
    pkgs.nodejs_22
  ];

  shellHook = ''
    echo "nodejs, vim and zellij are now available";
 '';

 __VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS = "envy";

}

