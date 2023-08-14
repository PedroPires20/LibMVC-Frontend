<script>
  import { Router, Route } from "svelte-routing";
  import Header from "./components/Header.svelte";
  import Collection from "./pages/Collection.svelte";
  import Loans from "./pages/Loans.svelte";
  import Redirect from "./utils/Redirect.svelte";
</script>

<Router>
  <Header/>
  <Route path="/collection" component={Collection}/>
  <Route path="/loans" component={Loans}/>
  <Route>
    <Redirect to="/collection"/>
  </Route>
</Router>
