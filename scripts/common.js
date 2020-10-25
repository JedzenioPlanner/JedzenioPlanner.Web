$(document).ready(async function() {
    $(".navbar-burger").click(function() {
        $(".navbar-burger").toggleClass("is-active");
        $(".navbar-menu").toggleClass("is-active");
    });
});
let auth0 = null;
let token = null;
const configureClient = async () => {  
    auth0 = await createAuth0Client({
      audience: "https://jedzenioplanner.xyz",
      domain: "dev-wop8zm8z.eu.auth0.com",
      client_id: "Rq3zpO194yBgw19wflly5p1o5b1eqEjI"
    });
  };
  window.onload = async () => {
    await configureClient();
    updateUI();
  };
  const updateUI = async () => {
    const isAuthenticated = await auth0.isAuthenticated();
    if(isAuthenticated){
        $("#logoutButton").removeClass("is-hidden")
        $("#loginButton").addClass("is-hidden")
    }
    else{
        $("#loginButton").removeClass("is-hidden")
        $("#logoutButton").addClass("is-hidden")
        if(window.location.href.includes("recipe/submit")){
          await login()
        }
    }
    const query = window.location.search;
  if (query.includes("code=") && query.includes("state=")) {
    await auth0.handleRedirectCallback();
    
    updateUI();
    window.history.replaceState({}, document.title, "/");
  }
  token = await auth0.getTokenSilently();
  };
  const login = async () => {
    await auth0.loginWithRedirect({
      redirect_uri: window.location.href
    });
  };
  const logout = () => {
    auth0.logout({
      returnTo: window.location.origin
    });
  };
  $("#loginButton").click(()=>{
      login()
  })
  $("#logoutButton").click(()=>{
    logout()
})