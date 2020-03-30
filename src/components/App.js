import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import LabelList from "containers/LabelList/LabelList";
import MemoList from "containers/MemoList/MemoList";
import MemoPad from "containers/MemoPad/MemoPad";
import { AppWrapper } from "styles/global";

function App() {
  return (
    <AppWrapper>
      <Switch>
        <LabelList />
      </Switch>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/label/all" />} />
        <Route path="/label/:labelId" component={MemoList} />
      </Switch>

      <Switch>
        <Route path="/label/:labelId/memo/:memoId" component={MemoPad} />
        <Route path="*" component={MemoPad} />
      </Switch>
    </AppWrapper>
  );
}

export default App;
