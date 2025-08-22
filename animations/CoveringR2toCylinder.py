from manim import *
import numpy as np

class CoveringR2toCylinder(ThreeDScene):
    def construct(self):
        # Title with the covering map
        title = MathTex(r"\mathbb{R}^2 \to S^1 \times \mathbb{R}: (t,h) \mapsto (e^{it}, h)").to_edge(UP)
        self.add_fixed_in_frame_mobjects(title)
        self.play(Write(title))

        # Set up camera
        self.set_camera_orientation(phi=70 * DEGREES, theta=30 * DEGREES, zoom=0.6)

        # 1. Show the domain: R^2 plane with colored strips
        plane = NumberPlane(
            x_range=[-3 * PI, 3 * PI, 2 * PI],
            y_range=[-3, 3, 1],
            x_length=10,
            y_length=6,
            background_line_style={"stroke_opacity": 0.5}
        ).shift(DOWN * 2)

        # Label for the plane
        plane_label = Tex(r"$\mathbb{R}^2$ (Universal Cover)").scale(0.7)
        self.add_fixed_in_frame_mobjects(plane_label)
        plane_label.to_corner(UL)

        # Color strips to show periodic identification
        strips = VGroup()
        colors = [BLUE_D, GREEN_D, PURPLE_D, ORANGE]
        strip_labels = VGroup()
        
        for i in range(-2, 3):
            strip = Rectangle(
                width=plane.c2p(2 * PI)[0] - plane.c2p(0)[0],
                height=6,
                fill_color=colors[i % len(colors)],
                fill_opacity=0.3,
                stroke_width=1,
                stroke_color=WHITE
            )
            strip.move_to(plane.c2p(2 * PI * i + PI, 0))
            strips.add(strip)
            
            # Add labels for the strips
            if i >= -1 and i <= 1:
                if i == 0:
                    label = MathTex("[0, 2\\pi]").scale(0.5)
                else:
                    label = MathTex(f"[{2*i}\\pi, {2*(i+1)}\\pi]").scale(0.5)
                label.move_to(plane.c2p(2 * PI * i + PI, 2.5))
                strip_labels.add(label)
        
        self.play(Create(plane), FadeIn(plane_label))
        self.play(FadeIn(strips), FadeIn(strip_labels))

        # Explanatory text
        strips_text = Tex(
            "Each vertical strip of \\\\width $2\\pi$ maps\\\\bijectively to the\\\\entire cylinder"
        ).scale(0.6)
        self.add_fixed_in_frame_mobjects(strips_text)
        strips_text.to_edge(DOWN)
        self.play(FadeIn(strips_text))
        self.wait(2)
        self.play(FadeOut(strips_text))
        
        fund_domain_rect = strips[2].copy().set_fill_opacity(0.6).set_stroke(YELLOW, width=3)
        fund_domain_text = Tex(
            "Fundamental Domain\\\\$[0, 2\\pi] \\times \\mathbb{R}$"
        ).scale(0.6)

        self.play(
            FadeOut(strips[0], strips[1], strips[3], strips[4]),
            FadeOut(strip_labels),
            Transform(strips[2], fund_domain_rect)
        )
        self.wait(0.5)

        self.add_fixed_in_frame_mobjects(fund_domain_text)
        fund_domain_text.to_edge(DOWN)
        self.play(FadeIn(fund_domain_text))
        self.wait(2)
        self.play(FadeOut(fund_domain_text))

        # 3. Show the identification process
        identification_text = Tex(
            "We identify opposite vertical edges:\\\\$(0, h) \\sim (2\\pi, h)$ for all $h$"
        ).scale(0.6)
        self.add_fixed_in_frame_mobjects(identification_text)
        identification_text.to_edge(DOWN)

        # Identification lines
        line_0 = Line(plane.c2p(0, -3), plane.c2p(0, 3), color=YELLOW, stroke_width=4)
        line_2pi = Line(plane.c2p(2*PI, -3), plane.c2p(2*PI, 3), color=YELLOW, stroke_width=4)
        
        edge_label_0 = MathTex("t=0").scale(0.6).next_to(line_0, LEFT, buff=0.2)
        edge_label_2pi = MathTex("t=2\\pi").scale(0.6).next_to(line_2pi, RIGHT, buff=0.2)
        self.add_fixed_in_frame_mobjects(edge_label_0)
        self.add_fixed_in_frame_mobjects(edge_label_2pi)

        self.play(
            Create(VGroup(line_0, line_2pi)),
            FadeIn(identification_text),
            FadeIn(edge_label_0), FadeIn(edge_label_2pi)
        )
        self.wait(2)

        # 4. Animate the wrapping process
        self.play(
            FadeOut(identification_text),
            FadeOut(edge_label_0), FadeOut(edge_label_2pi)
        )
        
        wrapping_text = Tex(
            "Watch the fundamental domain\\\\wrap into a cylinder"
        ).scale(0.6)
        self.add_fixed_in_frame_mobjects(wrapping_text)
        wrapping_text.to_edge(DOWN)
        self.play(FadeIn(wrapping_text))

        # Calculate the scale factor and get the center position
        plane_width = plane.c2p(2 * PI)[0] - plane.c2p(0)[0]
        plane_height = 6
        fund_domain_center = fund_domain_rect.get_center()
        
        # Create surface that starts flat and matches the plane's scaling
        wrapping_surface = Surface(
            lambda u, v: np.array([
                (u - PI) * plane_width / (2 * PI),
                0,
                v
            ]),
            u_range=[0, 2 * PI],
            v_range=[-3, 3],
            resolution=(32, 16),
            fill_opacity=0.6,
            fill_color=BLUE_D,
            stroke_color=BLUE_E,
            stroke_width=0.5
        )
        # Position it to match the fundamental domain rectangle
        wrapping_surface.move_to(fund_domain_center)

        self.play(
            FadeOut(plane),
            FadeOut(strips[2]),
            FadeOut(line_0, line_2pi),
            Create(wrapping_surface)
        )

        # FIXED: Remove the snapping animation - the surface is already in the right position
        # Just wait a moment for visual clarity
        self.wait(0.5)

        # Store the final cylinder position for alignment
        final_cylinder_center = fund_domain_center

        # The morphing animation with consistent scaling
        self.play(
            UpdateFromAlphaFunc(
                wrapping_surface,
                lambda mob, alpha: mob.become(
                    Surface(
                        lambda u, v: np.array([
                            (1 - alpha) * (u - PI) * plane_width / (2 * PI) + alpha * 2 * np.cos(u),
                            alpha * 2 * np.sin(u),
                            v
                        ]),
                        u_range=[0, 2 * PI],
                        v_range=[-3, 3],
                        resolution=(32, 16),
                        fill_opacity=0.6,
                        fill_color=BLUE_D,
                        stroke_color=BLUE_E,
                        stroke_width=0.5
                    ).move_to(final_cylinder_center)  # Keep it aligned during morphing
                )
            ),
            run_time=4
        )
        
        self.play(FadeOut(wrapping_text))
        
        # Label the cylinder
        cylinder_label = Tex(r"$S^1 \times \mathbb{R}$ (Cylinder)").scale(0.7)
        self.add_fixed_in_frame_mobjects(cylinder_label)
        cylinder_label.to_corner(UR)
        self.play(FadeIn(cylinder_label))
        self.wait(1)

        # 5. Show a helical path to demonstrate the covering
        helix_text = Tex(
            "Paths on $\\mathbb{R}^2$ map to helical paths\\\\on the cylinder"
        ).scale(0.6)
        self.add_fixed_in_frame_mobjects(helix_text)
        helix_text.to_edge(DOWN)
        self.play(FadeIn(helix_text))

        t_tracker = ValueTracker(0)
        h_tracker = ValueTracker(-3)

        # FIXED: Path on the cylinder aligned with the final cylinder position
        path_on_cyl = TracedPath(
            lambda: np.array([
                2 * np.cos(t_tracker.get_value()),
                2 * np.sin(t_tracker.get_value()),
                h_tracker.get_value()
            ]) + final_cylinder_center,  # Use the same center as the cylinder
            stroke_color=YELLOW, 
            stroke_width=6
        )

        # FIXED: Moving dot on cylinder with proper alignment
        dot_on_cyl = always_redraw(
            lambda: Dot(
                np.array([
                    2 * np.cos(t_tracker.get_value()),
                    2 * np.sin(t_tracker.get_value()),
                    h_tracker.get_value()
                ]) + final_cylinder_center,  # Use the same center as the cylinder
                color=YELLOW,
                radius=0.08
            )
        )

        self.play(FadeIn(path_on_cyl), FadeIn(dot_on_cyl))
        
        # Animate the helical motion
        self.play(
            t_tracker.animate.set_value(4 * PI),
            h_tracker.animate.set_value(3),
            run_time=8,
            rate_func=linear
        )
        self.wait(1)

        self.play(FadeOut(helix_text))

        # 6. Show multiple sheets covering the cylinder
        sheets_text = Tex(
            "The plane covers the cylinder infinitely many times\\\\(each strip wraps around once)"
        ).scale(0.6)
        self.add_fixed_in_frame_mobjects(sheets_text)
        sheets_text.to_edge(DOWN)
        self.play(FadeIn(sheets_text))

        # FIXED: Show multiple colored helices aligned with the cylinder
        additional_paths = VGroup()
        colors = [GREEN, RED, PURPLE]
        
        for i, color in enumerate(colors):
            shift = 2*PI*(i+1)
            path = ParametricFunction(
                lambda t: np.array([
                    2 * np.cos(t + shift),
                    2 * np.sin(t + shift),
                    -3 + 6*t/(4*PI)
                ]) + final_cylinder_center,  # Use the same center as the cylinder
                t_range=[0, 4*PI],
                stroke_color=color,
                stroke_width=4
            )
            additional_paths.add(path)

        self.play(Create(additional_paths), run_time=3)
        self.wait(2)

        # 7. Final summary
        self.play(FadeOut(sheets_text))
        summary = Tex(
            "The plane $\\mathbb{R}^2$ is the universal covering space\\\\of the cylinder $S^1 \\times \\mathbb{R}$"
        ).scale(0.7)
        self.add_fixed_in_frame_mobjects(summary)
        summary.to_edge(DOWN)

        self.play(FadeIn(summary))
        self.wait(3)