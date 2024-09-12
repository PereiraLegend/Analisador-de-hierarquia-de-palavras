"use client";

import HierarchyBuilder from '../components/HierarchyBuilder';
import { useState } from 'react';

const Main = () => {
  const [hierarchy, setHierarchy] = useState<{ [key: string]: any }>({});

  return (
    <div>
      <HierarchyBuilder hierarchy={hierarchy} setHierarchy={setHierarchy} />
    </div>
  );
};

export default Main;
