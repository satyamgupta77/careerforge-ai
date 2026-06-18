"use client";

import { useResumeStore } from "@/store/useResumeStore";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { GripVertical, Plus, Trash2 } from "lucide-react";

export default function ProjectsSection() {
  const { data, setResumeData, addProject, updateProject, removeProject } = useResumeStore();

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    
    const items = Array.from(data.projects);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setResumeData({ ...data, projects: items });
  };

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between border-b border-border pb-2">
        <h2 className="text-xl font-bold">Projects</h2>
        <Button variant="outline" size="sm" onClick={addProject}>
          <Plus className="w-4 h-4 mr-2" />
          Add Project
        </Button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="projects-list">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
              {data.projects.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...(provided.draggableProps as any)}
                      className="p-4 border rounded-lg bg-card text-card-foreground shadow-sm relative group flex gap-4"
                    >
                      <div
                        {...provided.dragHandleProps}
                        className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground mt-8"
                      >
                        <GripVertical className="w-5 h-5" />
                      </div>

                      <div className="flex-1 space-y-4">
                        <div className="flex justify-between items-start">
                          <div className="space-y-2 flex-1 mr-4">
                            <Label>Project Name</Label>
                            <Input
                              value={item.name}
                              onChange={(e) => updateProject(item.id, { name: e.target.value })}
                              placeholder="E-commerce Platform"
                            />
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive opacity-0 group-hover:opacity-100 transition-opacity mt-8"
                            onClick={() => removeProject(item.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>

                        <div className="space-y-2">
                          <Label>URL / Link (Optional)</Label>
                          <Input
                            value={item.url}
                            onChange={(e) => updateProject(item.id, { url: e.target.value })}
                            placeholder="https://github.com/username/project"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Description</Label>
                          <Textarea
                            value={item.description}
                            onChange={(e) => updateProject(item.id, { description: e.target.value })}
                            placeholder="Built a full-stack application using..."
                            rows={3}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      
      {data.projects.length === 0 && (
        <div className="text-center p-8 border border-dashed rounded-lg text-muted-foreground">
          No projects added yet. Click "Add Project" to get started.
        </div>
      )}
    </section>
  );
}
